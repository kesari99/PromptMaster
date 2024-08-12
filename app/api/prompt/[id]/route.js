import { connecToDb } from "@utils/database";
import Prompt from "@components/models/prompt"
import { TopologyDescription } from "mongodb";

export const GET = async (req, {params}) => {
    try{
        await connecToDb()

        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(prompts), {status: 200})

    }catch(err){
        return new Response("Failed to fetch promps", {status: 500})


    }
}

export const PATCH = async (req, {params}  ) => {

    const {prompt, tag} =await req.json()

    try{
        await connecToDb()

        const existingPrompt = await Prompt.findById(params.id)
        
        if(!existingPrompt) return new Response("Prompt not found", {status: 404})
        
            existingPrompt.prompt = prompt
            existingPrompt.tag = tag

            await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status: 200})

    }catch(err){
        console.log(err)

        return new Response("Failed to update prompt", {status: 500})

    }
}

export const DELETE = async(req, {params}) => {
    try{
        await connecToDb()

        await Prompt.findByIdAndDelete(params.id) 


        return new Response("Prompt deleted", {status: 200})

    }catch(err){

        return new Response("Failed to delete prompt", {status: 500})

    }

}