"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Book, Loader2, LogOut, Mail, User } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";

const detailsFormSchema = z.object({
  username: z.string(),
  gmail: z.string().email({ message: "Please enter a valid Gmail address." }),
  favoriteSubject: z.string().min(1, { message: "Favorite subject is required." }),
});

export function DetailsForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    setIsClient(true);
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username") || "";

    if (loggedIn !== 'true') {
      router.replace("/");
    } else {
      setUsername(storedUsername);
    }
  }, [router]);
  
  const form = useForm<z.infer<typeof detailsFormSchema>>({
    resolver: zodResolver(detailsFormSchema),
    values: { // Use values to dynamically update from state
        username: username,
        gmail: "",
        favoriteSubject: "",
    },
    mode: 'onChange'
  });
  
  // Watch for username changes and update form
  React.useEffect(() => {
    form.setValue('username', username);
  }, [username, form]);


  async function onSubmit(values: z.infer<typeof detailsFormSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/details/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your details have been submitted successfully.",
          variant: "default",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description: errorData.message || "Could not submit your details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    router.push("/");
  };

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95 shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div className="text-left">
                <CardTitle className="text-3xl font-bold">Welcome, {username}!</CardTitle>
                <CardDescription>Please provide your details below.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out" className="hover:text-destructive transition-colors">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      id="username"
                      label="Username"
                      icon={<User className="h-5 w-5 text-muted-foreground" />}
                      {...field}
                      disabled
                      className="cursor-not-allowed bg-muted/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      id="gmail"
                      label="Gmail Address"
                      type="email"
                      icon={<Mail className="h-5 w-5 text-muted-foreground" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="favoriteSubject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      id="favoriteSubject"
                      label="Favourite Subject"
                      icon={<Book className="h-5 w-5 text-muted-foreground" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold bg-gradient-to-r from-accent to-orange-400 text-white hover:scale-105 transition-transform" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Details
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
