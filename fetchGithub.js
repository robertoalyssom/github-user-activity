export async function fetchGithub(username) {
  try {
    const endpoint = `https://api.github.com/users/${username}/events`;
    const response = await fetch(endpoint);
    const events = await response.json();

    if (response.status !== 200) throw Error("Error fetching GitHub events");

    return events;
  } catch (e) {
    console.log(e.message);
    return [];
  }
}
