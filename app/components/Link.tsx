import { Link as RmxLink } from "remix";
import MuiLink from "@mui/material/Link";

import type { LinkProps as MuiLinkProps } from "@mui/material/Link";
import type { LinkProps as RmxLinkProps } from "@remix-run/react";

type LinkProps = RmxLinkProps & MuiLinkProps;
const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <MuiLink {...props} component={RmxLink}>
      {children}
    </MuiLink>
  );
};

export default Link;
