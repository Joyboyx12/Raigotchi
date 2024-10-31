"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addressContracts } from "@/lib/utils"
import { useContract } from "@thirdweb-dev/react"
import { toast } from "@/hooks/use-toast"
import { LoadingButton } from "@/components/ui/loading-button"
import { useState } from "react"

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
})

const FormFaucet = () => {

    const { contract } = useContract(addressContracts.faucet);
    
const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        address: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    handleFaucetToken(values.address)
  }

  const handleFaucetToken = async (address: string) => {
    try {
      if (!contract) return;
      setIsLoading(true)
      const faucetToken = await contract.call("getRaiToken",[address]);
      console.log("��� ~ handleFaucetToken ~ faucetToken:", faucetToken);
      toast({
        title: "Faucet",
        description: "Faucet successfully",
      })
      setIsLoading(false)
    } catch (error) {
      console.log("��� ~ handleFaucetToken ~ error:", error);
      setIsLoading(false)

      toast({
        title: "Faucet",
        description: "Faucet failed",
      })
    }
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 px-10">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-4xl">Address</FormLabel>
            <FormControl>
              <Input className="text-3xl  " placeholder="Address" {...field} />
            </FormControl>
            
            <FormMessage className="font-sans" />
          </FormItem>
        )}
      />
      <LoadingButton loading={isLoading} className="text-3xl" type="submit">Faucet</LoadingButton>
    </form>
  </Form>
  )
}

export default FormFaucet