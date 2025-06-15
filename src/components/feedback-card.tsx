import React from "react";

import {
  Typography,
  Card,
  CardBody,
  Avatar,
  Rating,
} from "@material-tailwind/react";

interface FeedbackCardProps {
  img: string;
  feedback: string;
  client: string;
  title: string;
}

export function FeedbackCard({
  img,
  feedback,
  client,
  title,
}: FeedbackCardProps) {
  return (
    // @ts-ignore
    <Card shadow={false} className="items-start text-left">
      {/* @ts-ignore */}
      <CardBody>
        {/* @ts-ignore */}
        <Avatar src={img} className="mb-2" alt={client} size="xl" />
        {/* @ts-ignore */}
        <Typography variant="h6" color="blue-gray">
          {client}
        </Typography>
        {/* @ts-ignore */}
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-1 mb-5 block font-normal">
          {title}
        </Typography>
        {/* @ts-ignore */}
        <Typography
          variant="paragraph"
          className="mb-6 font-normal text-gray-500">
          &quot;{feedback}&quot;
        </Typography>
        {/* @ts-ignore */}
        <Rating value={5} readonly />
      </CardBody>
    </Card>
  );
}
export default FeedbackCard;
