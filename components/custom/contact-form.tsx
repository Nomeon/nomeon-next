'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'

export const formSchema = z.object({
  name: z.string({
    required_error: 'Please enter your name',
  }).min(2, {
    message: 'Name is too short'
  }).max(50, {
    message: 'Name is too long'
  }),
  subject: z.string({
    required_error: 'Please enter a subject',
  }).min(2, {
    message: 'Subject is too short'
  }).max(50, {
    message: 'Subject is too long'
  }),
  email: z.string({
    required_error: 'Please enter your email',
  }).email({
    message: 'Invalid email address'
  }),
  phone: z.string().min(9, {
    message: 'Phone number is too short'
  }).max(15, {
    message: 'Phone number is too long'
  }),
  message: z.string({
    required_error: 'Please enter a message',
  }).min(10, {
    message: 'Message is too short'
  }).max(500, {
    message: 'Message is too long'
  })
})

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  // const reCaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsVerified] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subject: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await fetch('/api/mailer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      setSubmitted(true)
    } else {
      console.log(response)
    }
  }

  return (
    <>
      {submitted ? 
        <div>

        </div>
        :
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
            <div className='flex flex-col lg:flex-row gap-8 w-full'>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder="Name*" {...field} />
                  </FormControl>
                  <FormMessage className='absolute'/>
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder="E-mail*" {...field} />
                  </FormControl>
                  <FormMessage className='absolute' />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem className=''>
                <FormControl>
                  <Input placeholder="Subject*" {...field} />
                </FormControl>
                <FormMessage className='absolute'/>
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem className=''>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem className='-mt-4 pt-8'>
                <FormControl>
                  <div className='relative'>
                    <Textarea className='min-h-40' placeholder='Message*...' {...field} />
                    <div className='absolute top-0 left-0 w-1/4 h-[0.5px] bg-cyan-500' />
                    <div className='absolute top-0 left-0 h-1/4 w-[0.5px] bg-cyan-500' />
                    <div className='absolute bottom-0 right-0 w-1/4 h-[0.5px] bg-cyan-500' />
                    <div className='absolute bottom-0 right-0 h-1/4 w-[0.5px] bg-cyan-500' />
                  </div>
                </FormControl>
                <FormMessage className='absolute' />
              </FormItem>
            )} />
            <div className='pt-4 flex flex-col lg:flex-row gap-8 items-start'>
              <Button type='submit'  size={"lg"} className="">Verzenden</Button>
              {/* disabled={!isVerified} */}
              {/* <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                ref={recaptchaRef}
                onChange={handleChange}
                onExpired={handleExpired}
              /> */}
            </div>
          </form>
        </Form>
      }
    </>
  )
}

