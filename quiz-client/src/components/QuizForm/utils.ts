export const createEmptyAnswer = () => ({ _id: Math.random(), description: "" });

export const createEmptyQuestion = () => ({
  _id: Math.random(),
  answers: [createEmptyAnswer()],
  description: "",
});
