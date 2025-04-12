'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/useAuth';
import {Loader2} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const settingsSchema = z.object({
  font: z.string().optional(),
  uiLayout: z.string().optional(),
  colorScheme: z.string().optional(),
  writingStyle: z.string().optional(),
  images: z.boolean().default(true).optional(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

const AuthCheck = ({children}: {children: React.ReactNode}) => {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default function SettingsPage() {
  const [storedSettings, setStoredSettings] = useState<SettingsValues>({});

  useEffect(() => {
    // Load settings from localStorage on mount
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      setStoredSettings(JSON.parse(storedSettings));
    }
  }, []);

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      font: storedSettings.font || '',
      uiLayout: storedSettings.uiLayout || '',
      colorScheme: storedSettings.colorScheme || '',
      writingStyle: storedSettings.writingStyle || '',
      images: storedSettings.images !== undefined ? storedSettings.images : true,
    },
    mode: 'onChange',
  });

  function onSubmit(data: SettingsValues) {
    // Save settings to localStorage
    localStorage.setItem('settings', JSON.stringify(data));
    setStoredSettings(data);
  }

  return (
    <AuthCheck>
      <div className="container mx-auto py-10">
        <Card className="w-[500px] mx-auto">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Customize your experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="font"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Font</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a font"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Geist">Geist</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Arial">Arial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the font for the application.</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uiLayout"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>UI Layout</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a layout"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Modern">Modern</SelectItem>
                          <SelectItem value="Classic">Classic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the UI layout.</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="colorScheme"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Color Scheme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a color scheme"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Light">Light</SelectItem>
                          <SelectItem value="Dark">Dark</SelectItem>
                          <SelectItem value="System">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the color scheme for the application.</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="writingStyle"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Writing Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a writing style"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Formal">Formal</SelectItem>
                          <SelectItem value="Informal">Informal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the writing style for AI generated content.</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({field}) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Images/Illustrations</FormLabel>
                        <FormDescription>Enable or disable images and illustrations in the app.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Save Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AuthCheck>
  );
}
