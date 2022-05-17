const matchUpSpotifyLists = (listString) => {
  return /S\d{9}/.test(listString)
}

matchUpSpotifyLists("S131232121")
matchUpSpotifyLists("1312321321")



