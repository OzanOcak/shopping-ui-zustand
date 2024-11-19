import { UserIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@/store/store";

export function User() {
  const { setAddress, setFullName, setUserName, address, fullName, userName } =
    useStore(
      useShallow((state) => ({
        fullName: state.fullName,
        userName: state.userName,
        address: state.address,
        setAddress: state.setAddress,
        setFullName: state.setFullName,
        setUserName: state.setUserName,
      }))
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <Label htmlFor="fullName">Full Name:</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Label htmlFor="userName">Username:</Label>
        <Input
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Label htmlFor="address">Your Address:</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
