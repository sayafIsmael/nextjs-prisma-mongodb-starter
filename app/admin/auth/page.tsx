"use client";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const formSchema = z.object({
  name: z.optional(z.string()),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type Variant = "LOGIN" | "REGISTER";

function Login() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => {
        setLoading(false)
        toast.success("Registration successfull!")
      })
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/admin/dashboard')
        }
      })
      .finally(() => setLoading(false))
    }

  };

  return (
    <div className="h-full grid md:grid-cols-3 gap-4 content-center bg-gray-400">
      <div />
      <Card className="m-4 p-5">
        <CardHeader className="my-5">
          <CardTitle className="text-center">
            {variant === "LOGIN" ? "LOGIN" : "SIGN UP"}
          </CardTitle>
        </CardHeader>
        <CardContent className="my-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {variant === "REGISTER" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full mt-5"
                variant="default"
                type="submit"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {variant === "LOGIN" ? "LOGIN" : "SIGN UP"}
              </Button>
            </form>
          </Form>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="w-full mt-5"
              variant="outline"
              type="button"
              disabled={loading}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              className="w-full mt-5"
              variant="outline"
              type="button"
              disabled={loading}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>
        </CardContent>
        <CardFooter className="block justify-center">
          <div className="relative mb-2">
            <div className="relative flex justify-center uppercase">
              <span className="bg-background text-sm px-2">
                Forgot password
              </span>
            </div>
          </div>
          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            px-2 
            text-gray-500
          "
          >
            <div>
              {variant === "LOGIN" ? "New user?" : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </CardFooter>
      </Card>
      <div />
    </div>
  );
}

export default Login;
