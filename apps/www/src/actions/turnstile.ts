"use server";

export const verifyTurnstile = async (token: string) => {
  let formData = new FormData();
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY ?? "");
  formData.append("response", token);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();
  return outcome.success as boolean;
};
