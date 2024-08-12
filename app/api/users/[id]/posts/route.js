import { connecToDb } from "@utils/database";
import Prompt from "@components/models/prompt"

export const GET = async (request,{params}) => {
    try{
        await connecToDb()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        console.log(prompts)

        return new Response(JSON.stringify(prompts), {status: 200})

    }catch(err){
        return new Response("Failed to fetch promps", {status: 500})


    }
}