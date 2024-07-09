"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useUserAuthQuery from "@/hooks/auth/queries";

function ProfilePage() {
  const { data } = useUserAuthQuery();

  const phone = data?.phone.match(/^(\+\d{2})?\s?(\d{10})$/);

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Register Phone Number</CardTitle>
          <CardDescription>
            Used to identify your Account in the Woodland.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              placeholder="Contact Number"
              disabled={true}
              value={`${phone?.[1]} ${phone?.[2]}`}
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4"></CardFooter>
      </Card>
    </div>
  );
}

export default ProfilePage;
