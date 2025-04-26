import axios from "axios";

async function Getitem() {
  try {
    const res = await axios.get(
      "https://mocki.io/v1/594cbe0d-5345-43cd-bd0e-ec473b861d2f"
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}
async function Getuser() {
  try {
    const res = await axios.get(
      "https://mocki.io/v1/79bd609c-b1ed-49fa-a90a-ba6498f24aee"
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
}

export async function Getalluser() {
  try {
    const user = await Getuser({});
    return new Response(JSON.stringify(user), {
      method: "GET",
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error fetching user data", {
      status: 500,
    });
  }
}

export async function Getallitem() {
  try {
    const products = await Getitem({});
    return new Response(JSON.stringify(products), {
      method: "GET",
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error fetching products", {
      status: 500,
    });
  }
}

export async function Viewitem(id) {
  try {
    const response = await axios.get(
      "https://mocki.io/v1/594cbe0d-5345-43cd-bd0e-ec473b861d2f"
    );
    const allArticles = response.data;

    const doc = allArticles.find(
      (item) => item.id.toString() === id.toString()
    );

    if (!doc) {
      throw new Error("Article not found");
    }

    return doc;
  } catch (error) {
    throw new Error("Failed to fetch article");
  }
}
