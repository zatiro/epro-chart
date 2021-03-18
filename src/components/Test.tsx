import { Button } from "@chakra-ui/button";
import { MenuList } from "@chakra-ui/menu";
import { MenuItem } from "@chakra-ui/menu";
import { MenuButton } from "@chakra-ui/menu";
import { Menu } from "@chakra-ui/menu";

export function Test(){
  return(
    <div>
      <Menu>
        <MenuButton as={Button} >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}