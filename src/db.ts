export interface CardInterface {
    user: string
    title: string
    desc: string
    img: string
    timePosted:number
}
export const array: CardInterface[] = [
    {
        user: "by random person 1",
        title: "Legal",
        desc: "Human Resources",
        timePosted: new Date("2024-03-20T02:00:00").getTime(),
        img: "https://th.bing.com/th/id/R.439a96814e4adbdbfcb8ccc4dfe5428f?rik=dFrCXif7Gi87Hw&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f02%2f6966828-beautiful-mountain-lakes.jpg&ehk=%2bg%2bVQ5VbliISAtOpOXMF0kQcE9UuTuxx58zhi69EO4k%3d&risl=1&pid=ImgRaw&r=0"
    },
    {
        user: "by random person 2",
        title: "Training",
        desc: "Training",
        timePosted: new Date("2024-03-20T01:56:00").getTime(),
        img: "https://blog.mystart.com/wp-content/uploads/shutterstock_124222435-e1521832609986.jpg"
    },
    {
        user: "by random person 3",
        title: "Marketing",
        desc: "Accounting",
        timePosted: new Date("2024-03-20T01:30:00").getTime(),
        img: "https://th.bing.com/th/id/R.61b5be101b7f9189ffc62347330327b6?rik=k0czb7BOQuxu2Q&riu=http%3a%2f%2fphandroid.s3.amazonaws.com%2fwp-content%2fuploads%2f2014%2f10%2fmountains.jpg&ehk=SgiUqECI25%2by9ZeBe0dfIVZyigJSGLOgjtHuPX%2bMuvM%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        user: "by random person 4",
        title: "Sales",
        desc: "Engineering",
        timePosted: new Date("2024-03-20T02:10:00").getTime(),
        img: "https://th.bing.com/th/id/R.d492bd1e95dbe9cf9fd6ae008034d014?rik=0CEm8MFUTU0mPw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f8Ww0M0U.jpg&ehk=DRcL75viRagRiXIXKLm8JZk6kEb3bRL2eoQDt%2fjjH6A%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        user: "by random person 5",
        title: "Legal",
        desc: "Services",
        timePosted: new Date("2024-03-20T01:00:00").getTime(),
        img: "https://images.designtrends.com/wp-content/uploads/2016/04/06093736/Mountain-HD-Wallpapers.jpg"
    },
    {
        user: "by random person 6",
        title: "Business Development",
        desc: "Business Development",
        timePosted: new Date("2024-03-20T02:04:00").getTime(),
        img: "https://images.pexels.com/photos/291732/pexels-photo-291732.jpeg?cs=srgb&dl=cold-glacier-snow-291732.jpg&fm=jpg"
    }
];