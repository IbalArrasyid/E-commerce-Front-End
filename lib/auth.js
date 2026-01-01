import jwt from "jsonwebtoken";

export async function getUserFromRequest(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.decode(token);

    const userId = decoded?.data?.user?.id;
    if (!userId) return null;

    return {
      id: Number(userId),
    };
  } catch (err) {
    console.error("JWT decode failed:", err);
    return null;
  }
}
