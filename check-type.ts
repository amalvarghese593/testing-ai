interface Pet {
  name: string;
  breed: string;
}
const dss = { name: "Max" };
const data: Pet = dss as Pet;
