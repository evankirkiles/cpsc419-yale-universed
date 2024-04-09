import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const onCampus = [
  "Jonathan Edwards",
  "Morse",
  "Silliman",
  "Branford",
  "Saybrook",
  "Davenport",
  "Pierson",
  "Trumbull",
  "Timothy Dwight",
  "Pauli Murray",
  "Benjamin Franklin",
  "Grace Hopper",
  "Ezra Stiles",
];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

async function main() {
  await Promise.all(
    onCampus.map(async (loc) =>
      prisma.location.upsert({
        where: { slug: slugify(loc) },
        update: {},
        create: { slug: slugify(loc), name: loc, isOffCampus: false },
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
