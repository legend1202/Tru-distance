import { GraModel } from '../../models/gra.model';

export const extractGraDetails = async (
  text: string,
  proposalId: string,
  wbsId: string,
  clinId: string,
  boeId: string
) => {
  await GraModel.deleteMany({});

  const grasPattern =
    /Ground Rules and Assumptions \(GR&As\):([\s\S]+?)(?=\n[A-Z][a-zA-Z]+\s*:|$)/;
  const match = grasPattern.exec(text);
  if (match) {
    const grasSection = match[1];
    // Extract bullet points starting with ❑ or other delimiters
    grasSection
      .split('\n')
      .filter((line) => line.trim().startsWith('❑')) // Identify bullet points
      .forEach(async (line) => {
        const description = line.replace(/^❑\s*/, '').trim(); // Remove bullet symbol and trim
        const boeData = {
          proposalId,
          wbsId,
          clinId,
          boeId,
          description,
          status: false, // Default status, you can update this based on logic
        };

        const newBoe = new GraModel(boeData);
        await newBoe.save();
      });
  }
};
