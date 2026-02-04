export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  url: string;
  genre: string;
  duration?: string;
  album_id?: number;
}

export const MUSIC_DATA: Song[] = [

  {
    id: 1,
    title: "Harvest moon",
    artist: "$uicideboy$",
    image: "https://cdn-images.dzcdn.net/images/cover/d5b7302544042d77a45fff2f9094ec39/0x1900-000000-80-0-0.jpg",
    url: "https://cdnt-preview.dzcdn.net/api/1/1/4/d/5/0/4d5265dcc5494e7c40a435d80ac3d875.mp3?hdnea=exp=1770186460~acl=/api/1/1/4/d/5/0/4d5265dcc5494e7c40a435d80ac3d875.mp3*~data=user_id=0,application_id=42~hmac=657f4b2cb9c27aad7da79f5677528a5e9aef352c097a6e1d00bd0f3b084ed52c",
    genre: "Rap / Horrorcore",
    duration: "1:48",
    album_id: 101
  },
  {
    id: 2,
    title: "Runnin' Thru the 7th with My Woadies",
    artist: "$uicideboy$",
    image: "https://cdn-images.dzcdn.net/images/artist/6e1c90401ea0548202794939bd7dd4de/1900x1900-000000-80-0-0.jpg",
    url: "https://cdnt-preview.dzcdn.net/api/1/1/5/3/a/0/53aebe52668a57a64deb91ef5b5422ea.mp3?hdnea=exp=1770186460~acl=/api/1/1/5/3/a/0/53aebe52668a57a64deb91ef5b5422ea.mp3*~data=user_id=0,application_id=42~hmac=b568129d3abddc8765ad2a86d92ce117e2090e20bf69cdd810aea872e20d47a2",
    genre: "Rap / Horrorcore",
    duration: "2:26",
    album_id: 101
  },


  {
    id: 3,
    title: "STARTGAZING",
    artist: "Travis Scott",
    image: "https://img.texasmonthly.com/2019/02/15-Astroworld.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&h=1400&ixlib=php-3.3.1&q=45&w=1400", // Tu imagen original
    url: "https://cdnt-preview.dzcdn.net/api/1/1/d/7/e/0/d7e9762c34521ef9fe110dbb98f5066f.mp3?hdnea=exp=1770186672~acl=/api/1/1/d/7/e/0/d7e9762c34521ef9fe110dbb98f5066f.mp3*~data=user_id=0,application_id=42~hmac=7899927ccd75edb65d37fe304d943d4f9bdf243e9349659a45a201aa6071bcb9",
    genre: "Hip-Hop",
    duration: "5:12",
    album_id: 102
  },
  {
    id: 4,
    title: "FE!N",
    artist: "Travis Scott",
    image: "https://www.lamusica.com.co/cdn/shop/products/TravisScott_2_Astroworld.jpg?v=1642190712",
    url: "https://cdnt-preview.dzcdn.net/api/1/1/0/2/7/0/02700631951a33db90a0024531e2378d.mp3?hdnea=exp=1770185730~acl=/api/1/1/0/2/7/0/02700631951a33db90a0024531e2378d.mp3*~data=user_id=0,application_id=42~hmac=362907f2e9a5e265d71acc59a1e3cce15e01046007888fd6aa298f4c4a45f926",
    genre: "Hip-Hop",
    duration: "4:03",
    album_id: 102
  },


  {
    id: 5,
    title: "Star Shopping",
    artist: "Lil Peep",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/LilPeep-Hellboy_%28cropped%29.jpg",
    url: "https://cdnt-preview.dzcdn.net/api/1/1/6/4/6/0/6469cbb2bc8825af940ee810cd079e0c.mp3?hdnea=exp=1770186324~acl=/api/1/1/6/4/6/0/6469cbb2bc8825af940ee810cd079e0c.mp3*~data=user_id=0,application_id=42~hmac=86623d59d440068727f1f2dca544599403a52c015b6980a8e5737d576da5b71a",
    genre: "Emo Rap",
    duration: "2:22",
    album_id: 103
  },
  {
    id: 6,
    title: "beamer boy",
    artist: "Lil Peep",
    image: "https://i.pinimg.com/736x/31/76/44/31764484ec1b513be29b60d596b4faa7.jpg",
    url: "https://cdnt-preview.dzcdn.net/api/1/1/0/3/7/0/037d4d3f18e38e1ed589262ed04b8928.mp3?hdnea=exp=1770186324~acl=/api/1/1/0/3/7/0/037d4d3f18e38e1ed589262ed04b8928.mp3*~data=user_id=0,application_id=42~hmac=82ff570074281541fb657a7804c60e52748346e835217aed97cad1dc22a42e4c",
    genre: "Emo Rap",
    duration: "3:52",
    album_id: 103
  }
];