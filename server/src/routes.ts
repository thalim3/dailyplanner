import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

const appRoutes = async (app: FastifyInstance) => {
  app.post("/register", async (request, reply) => {
    const createUserBody = z.object({
      name: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { name, lastname, email, password } = createUserBody.parse(
        request.body
      );

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return reply
          .status(400)
          .send({ message: "User already exists with this email." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          lastname,
          email,
          password: hashedPassword,
        },
      });

      return reply.status(201).send({ message: "User created successfully!" });
    } catch (error: any) {
      console.error(error);
      return reply.status(400).send({ message: error.message });
    }
  });

  app.post("/login", async (request, reply) => {
    const loginBody = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const { email, password } = loginBody.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return reply.status(400).send({ message: "User not found." });
      }

      console.log(user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return reply.status(400).send({ message: "Invalid password." });
      }

      return reply.status(200).send({ message: "Login successful!" });
    } catch (error: any) {
      console.error(error);
      return reply.status(400).send({ message: error.message });
    }
  });

  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      titles: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });
    const { titles, weekDays } = createHabitBody.parse(request.body);
    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        titles,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });
    const { date } = getDayParams.parse(request.query);
    const parseDate = dayjs(date).startOf("day");
    const weekDay = parseDate.get("day");
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return {
      possibleHabits,
      completedHabits,
    };
  });

  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);
    const today = dayjs().startOf("day").toDate();
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
        SELECT 
            D.id, 
            D.date,
            (
                SELECT
                    cast(count(*) as float)
                FROM day_habits DH
                WHERE DH.day_id = D.id
            ) as completed,
            (
                SELECT
                    cast(count(*) as float)
                FROM habit_week_days HWD
                JOIN habits H
                    ON H.id = HWD.habit_id
                WHERE
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                    AND H.created_at <= D.date
            )as amount
        FROM days D
        `;

    return summary;
  });
};
export default appRoutes;
