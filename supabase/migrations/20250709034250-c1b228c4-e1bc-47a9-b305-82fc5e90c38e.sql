-- Create trigger function to send welcome email after newsletter subscription
CREATE OR REPLACE FUNCTION public.send_welcome_email_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function asynchronously using pg_net
  PERFORM net.http_post(
    url := 'https://mwpdhkndlsfuilouofjl.supabase.co/functions/v1/send-welcome-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cGRoa25kbHNmdWlsb3VvZmpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTY3OTcyMSwiZXhwIjoyMDY3MjU1NzIxfQ.2wOEYI9u0dH6rZMCM12DVzPLN2cYZ1nY-Ao-OzjMWW8'
    ),
    body := jsonb_build_object('email', NEW.email)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically send welcome email
CREATE TRIGGER send_welcome_email_on_subscription
AFTER INSERT ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.send_welcome_email_trigger();