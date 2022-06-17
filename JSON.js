// let x = [{ "something": 1 }]

// let str = JSON.stringify(x)
// str
// let str = '[{"url":"https://cdn.nightlife.com.au/","use_default_speed":true},{"url":"https://144.217.247.192/","use_default_speed":true}]'
// let obj = JSON.parse(str)
// console.log(obj)

let results = [
  {
    system_id: "2KW 01A",
    content_servers: "[{\"url\":\"https://cdn.nightlife.com.au/\",\"use_default_speed\":true}]"
  }
]

let r = results.map((obj) => {
  return {
    system_id: obj.system_id,
    content_servers: JSON.parse(obj.content_servers)
  }
})

console.log(r[0].content_servers)


