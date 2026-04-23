import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from "../../components/ReelFeed"

const Home = () => {
    const [ videos, setVideos ] = useState([])
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    // async function likeVideo(item) {

    //     const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, {withCredentials: true})

    //     if(response.data.like){
    //         console.log("Video liked");
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
    //     }else{
    //         console.log("Video unliked");
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
    //     }
    //      setVideos(prev =>
    //     prev.map(v =>
    //         v._id === item._id
    //             ? { ...v, likeCount: response.data.likeCount }
    //             : v
    //     )
    // );
        
   // }

    // async function saveVideo(item) {
    //     const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
        
    //     if(response.data.save){
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
    //     }else{
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
    //     }
    // }
    async function likeVideo(item) {

    const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
    );

    setVideos(prev =>
        prev.map(v => {
            if (v._id !== item._id) return v;

            const current = v.likeCount || 0;

            if (response.data.like) {
                return { ...v, likeCount: current + 1 };
            } else {
                return { ...v, likeCount: Math.max(0, current - 1) };
            }
        })
    );
}

async function saveVideo(item) {

    const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
    );

    setVideos(prev =>
        prev.map(v => {
            if (v._id !== item._id) return v;

            const current = v.savesCount || 0;

            if (response.data.save) {
                return { ...v, savesCount: current + 1 };
            } else {
                return { ...v, savesCount: Math.max(0, current - 1) };
            }
        })
    );
}

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home