import { connecToDb } from "@utils/database";
import Prompt from "@components/models/prompt"

export const POST =  async (req) => {
    const {userId, prompt, tag} = await req.json();


    try{
        await connecToDb()
        const newPrompt = new Prompt ({
            creator: userId,
            prompt,
            tag
        })

       

        await newPrompt.save()
        console.log(newPrompt)

        return new Response(JSON.stringify(newPrompt),{status: 200} )
    }catch(err){
        return new Response("Failed to create a new Prompt", {status: 500})
    }
}