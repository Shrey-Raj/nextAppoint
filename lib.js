export const login = async ({ identifier, password }) => {
  try {
    const response = await fetch("http://localhost:1337/api/auth/local/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      console.log(response);
      return { success: true , data : response.body };
    } else {
      console.log("SOME error occured ");
    }
  } catch (error) {
    console.log(error);
  }
};
