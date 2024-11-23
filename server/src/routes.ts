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
      confirmPassword: z.string().min(6),
    });

    try {
      const { name, lastname, email, password, confirmPassword } = createUserBody.parse(request.body);

      if (password !== confirmPassword) {
        return reply.status(400).send({ message: "Senhas não conferem." });
      }
      
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return reply.status(400).send({ message: "Este e-mail já está cadastrado" });
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

      return reply.status(201).send({ message: "Cadastro realizado com sucesso"});
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
        return reply.status(400).send({ message: "E-mail e/ou senha estão inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(400).send({ message: "E-mail e/ou senha estão inválidos" });
      }

      return reply.status(200).send({ message: "Login successful!" });
    } catch (error: any) {
      console.error(error);
      return reply.status(400).send({ message: error.message });
    }
  });

  app.post("/habits", async (request, reply) => {
    const createHabitBody = z.object({
      titles: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });
    
    try {
      const { titles, weekDays } = createHabitBody.parse(request.body);
      const today = dayjs().startOf("day").toDate();
  
      // Verificando a criação do hábito
      const habit = await prisma.habit.create({
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
  
      return reply.status(201).send(habit);
    } catch (error: any) {
      console.error(error);
      return reply.status(400).send({ message: error.message });
    }
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

app.delete("/habits/:id", async (request, reply) => {
  const deleteHabitParams = z.object({
    id: z.string().uuid(), 
  });

  try {
    const { id } = deleteHabitParams.parse(request.params);

    const habit = await prisma.habit.findUnique({
      where: { id },
    });

    if (!habit) {
      return reply.status(404).send({ message: "Erro na exclusão do hábito! Tente novamente."});
    }

    const dependentDayHabits = await prisma.dayHabit.findMany({
      where: { habit_id: id },
    });

    if (dependentDayHabits.length > 0) {
      console.log(`Found dependent dayHabits: ${dependentDayHabits.length}`);

      await prisma.dayHabit.deleteMany({
        where: { habit_id: id },
      });
    }

    await prisma.habit.delete({
      where: { id },
    });

    return reply.status(200).send({ message: "Hábito excluído com sucesso" });
  } catch (error: any) {
    console.error("Erro na exclusão do hábito! Tente novamente.", error); 
    return reply.status(500).send({
      message: error.message || "Internal Server Error",
      errorDetails: error, 
    });
  }
});

  app.patch("/habits/:id", async (request, reply) => {
    const updateHabitParams = z.object({
      id: z.string().uuid(), 
    });

    const updateHabitBody = z.object({
      titles: z.string().optional(), 
      weekDays: z.array(z.number().min(0).max(6)).optional(), 
    });

    try {
      const { id } = updateHabitParams.parse(request.params);
      const { titles, weekDays } = updateHabitBody.parse(request.body);

      const habit = await prisma.habit.findUnique({
        where: { id },
      });

      if (!habit) {
        return reply.status(404).send({ message: "Hábito não encontrado" });
      }

      if (titles) {
        await prisma.habit.update({
          where: { id },
          data: { titles },
        });
      }

      if (weekDays) {
        await prisma.habit.update({
          where: { id },
          data: {
            weekDays: {
              deleteMany: {}, 
            },
          },
        });

        await prisma.habit.update({
          where: { id },
          data: {
            weekDays: {
              create: weekDays.map((weekDay) => ({
                week_day: weekDay,
              })),
            },
          },
        });
      }

      return reply.status(200).send({ message: "Hábito atualizado com sucesso." });
    } catch (error: any) {
      console.error(error);
      return reply.status(400).send({ message: error.message });
    }
  });
};

export default appRoutes;
