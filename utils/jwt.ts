import * as JWT from "jsonwebtoken";

export const makeToken = async (id: number, name: string, role: string): Promise<string> => {
    const payload = { id, name, role };
  
    try {
      const token = await JWT.sign(payload, process.env.JWT_KEY!, { expiresIn: "2h" });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
