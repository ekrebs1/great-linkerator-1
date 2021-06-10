import axios from 'axios';

export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get('/api/tags');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLinks() {
  try {
    const { data } = await axios.get('/api/links');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTags() {
  try {
    const { data } = await axios.post('/api/tags');
    return data;
  } catch (error) {
    throw error;
  }
}