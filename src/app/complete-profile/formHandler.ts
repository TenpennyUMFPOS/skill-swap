"use server";
export default async function formHandler(formData: FormData) {
  const birth = normalizeDate(
    +formData.get("birth_date")!,
    +formData.get("birth_month")!,
    +formData.get("birth_year")!,
  );
  const skills = getAllSkills();
  console.log(formData);
  const rawFormData = {
    avatar: formData.get("avatar"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    gender: formData.get("gender"),
    birth: birth,
    skills: skills,
  };

  function getAllSkills() {
    const skills = [];
    skills.push(formData.get("skill-0"));
    skills.push(formData.get("skill-1"));
    skills.push(formData.get("skill-2"));
    skills.push(formData.get("skill-3"));
    skills.push(formData.get("skill-4"));
    return skills;
  }
  function normalizeDate(date: number, month: number, year: number): string {
    const transformedDate = new Date(year, month - 1, date);
    const isoDateString = transformedDate.toISOString();
    return isoDateString;
  }
}
