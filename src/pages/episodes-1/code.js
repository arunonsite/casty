const episodeList = [{
    name:'	How to Sell -1',
    number :'1',
    desc : "A Channel Description (also known as a “YouTube About Page”) is a brief outline of what type of content you publish on your channel. It appears on your Channel Page and in YouTube's search results. ... And a well-written Channel Description can also convert visitors into subscribers.",
    show :"Demo",
    image : 'https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_QL50_SY1000_CR0,0,674,1000_AL_.jpg'
  },{
    name:'	How to Sell -2',
    number :'2',
    desc : "A Channel Description (also known as a “YouTube About Page”) is a brief outline of what type of content you publish on your channel. It appears on your Channel Page and in YouTube's search results. ... And a well-written Channel Description can also convert visitors into subscribers.",
    show :"Demo",
    image : 'https://www.golegal.co.za/wp-content/uploads/2019/04/Game-of-Thrones.png'
  },{
    name:'	How to Sell -3',
    number :'3',
    desc : "A Channel Description (also known as a “YouTube About Page”) is a brief outline of what type of content you publish on your channel. It appears on your Channel Page and in YouTube's search results. ... And a well-written Channel Description can also convert visitors into subscribers.",
    show :"Demo",
    image : 'https://cdn.siasat.com/wp-content/uploads/2019/04/Got_ANI.jpg'
  },{
    name:'	How to Sell -4',
    number :'4',
    desc : "Episode 1. How To Sell Description",
    show :"Demo",
    image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6NE0xXnU0IRosgBdEYzK7IMiAOquBVZtfRaiPbMDNmlQb0Ux&s'
  },{
    name:'	How to Sell -5',
    number :'5',
    desc : "Episode 1. How To Sell Description",
    show :"Demo",
    image : 'https://i.ytimg.com/vi/rlR4PJn8b8I/maxresdefault.jpg'
  }
];
  var episodes = [], size = 3;

while (episodeList.length > 0)
episodes.push(episodeList.splice(0, size));