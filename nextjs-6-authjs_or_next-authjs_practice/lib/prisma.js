// import { PrismaClient } from "@prisma/client";

// const globalUseThis = globalThis

// const prisma = globalUseThis.prisma || new PrismaClient();

// if(process.env.NODE_ENV !== "production") {
//   globalUseThis.prisma = prisma;
// }

// export { prisma };
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis;

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;

// path : lib/prisma.js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
