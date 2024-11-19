import axios from "axios"

const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGI1MDEyNGQ1MjFmMTZmYTBiNmVlNDNhNmE2ODlkZSIsIm5iZiI6MTczMTg4MDg4Mi45MTk3Mzg4LCJzdWIiOiI2NzNhNjE0ZTJjMGI3ZmQyMDM0YWEzYWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MPU6Se9STjDnthGdweBut1nBFKm6NnuOry1XWcrpAIc"

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: "en-US",
    page: "1",
  },
})
