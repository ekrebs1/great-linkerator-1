import axios from "axios";

export async function getLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get("/api/tags");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinkTags() {
  try {
    const { data } = await axios.get("/api/link_tags");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLinks(
  name,
  link,
  createDate,
  comment,
  tags,
  clickNum
) {
  try {
    const { data } = await axios.post("/api/links", {
      name: name,
      link: link,
      createDate: createDate,
      comment: comment,
      tags: tags,
      clickNum: clickNum,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTags() {
  try {
    const { data } = await axios.post("/api/tags");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteLink(id) {
  try {
    const { data } = await axios.delete(`/api/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchLink(id, name, link, comment, clickNum, tags ) {
  try {
    const { data } = await axios.patch(`/api/${id}`, {
      name: name,
      link: link,
      comment: comment,
      clickNum: clickNum,
      tags: tags
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateClick(id, newClickNum) {
  try {
    const { data } = await axios.patch(`/api/${id}`, {
      clickNum: newClickNum,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateFavorite(id, boo) {
  try {
    const { data } = await axios.patch(`/api/${id}`, {
      favorite: boo,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinksByTag(tagName) {
  try {
    const { data } = await axios.get(`/api/${tagName}/links`)
    return data
  } catch (error) {
    throw error
  }
}

