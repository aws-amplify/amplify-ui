import React, { useState } from "react";
import { Badge, BadgeVariant, BadgeSize } from "@aws-amplify/ui-react";

export const BadgeDemo = () => {
  const [variant, setVariant] = useState<BadgeVariant>("default");
  const [size, setSize] = useState<BadgeSize>("medium");

  return (
    <div>
      <select
        value={variant}
        placeholder="Select button variant"
        onChange={event => setVariant(event.target.value as BadgeVariant)}
      >
        <option value="default">default</option>
        <option value="info">info</option>
        <option value="error">error</option>
        <option value="warning">warning</option>
        <option value="success">success</option>
      </select>
      <select
        value={size}
        placeholder="Select button size"
        onChange={event => setSize(event.target.value as BadgeSize)}
      >
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select>
      <Badge variant={variant} size={size}>BADGE!</Badge>
    </div>
  );
};
