import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../Context/AuthProvider';
import Post from './Post';

const Media = () => {
    const { user, loading, setLoading } = useContext(AuthContext);

    if (loading) {
        return <Loader />
    }
    const { data: status = [], isLoading, refetch } = useQuery({
        queryKey: ["status"],
        queryFn: async () => {
            try {
                const res = await axios("https://fakebook-server.vercel.app/posts");
                // console.log(res.data)
                return res.data.data;
            } catch (error) {
                console.log(error.message)
            }
        }
    });
    const uid = { uid: user.uid };
    // console.log(uid)
    const handleReaction = async (sta) => {
        // console.log(sta)
        const res = await axios.put(`https://fakebook-server.vercel.app/posts/${sta._id}`, uid)
        try {
            if (res.data.success) {
                // console.log("hello")
                refetch();
            }
        } catch (error) {

        }
    }


    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='p-12 grid grid-cols-1 gap-4'>
            {
                status.map(sta => <Post
                    key={sta._id}
                    sta={sta}
                    userId={uid}
                    handleReaction={handleReaction}
                    loading={loading}
                />)
            }
        </div>
    );
};

export default Media;