/*** Different types of Authentications /noAuth, /basicAuth, /apiKey, /bearerToken ***/

import express from "express"
import axios from "axios"

const app = express()
const port = 3000
const API_URL = "https://secrets-api.appbrewery.com/"

const yourUsername = "t3sila"
const yourPassword = "AnaAslunFager"
const yourAPIKey = "bac3f778-2f3d-4be7-ad3b-00eab1d51dc6"
const yourBearerToken = "27dadeaa-1e7a-40dd-b9fb-aef30248b6a2"

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." })
})

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random")
    const content = JSON.stringify(response.data)
    console.log(content)
    res.render("index.ejs", { content: content })
  } catch (error) {
    res.status(404).send("Error: ", error.message)
  }
})

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {}, // page: 2
    })
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    res.status(404).send("Error: ", error.message)
  }
})

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    })
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    res.status(404).send("Error: ", error.message)
  }
})

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "secrets/45", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
      params: {},
    })
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    res.status(404).send("Error: ", error.message)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
