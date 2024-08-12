import { connecToDb } from "@utils/database";
import Prompt from "@components/models/prompt"

export const GET = async (req,{ params}) => {
    try{
        await connecToDb()

        const searchValue = req.nextUrl.searchParams.get('search_by')?.toLowerCase().replace(/^#/, '').trim()
        
        let prompts;
        if(searchValue){
            const regex = new RegExp(searchValue, 'i'); 
            prompts = await Prompt.find({
                $or: [
                    {prompt: {$regex: regex} },
                    {tag:{$regex: regex} }
                ]
            }).populate('creator')

        }
        else{
            prompts = await Prompt.find({}).populate('creator')
        }


        return new Response(JSON.stringify(prompts), {status: 200})

    }catch(err){
        return new Response("Failed to fetch promps", {status: 500})


    }
}