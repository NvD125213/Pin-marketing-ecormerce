import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";

interface CourseCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  label: string;
}

export function CourseCard({ img, tag, title, desc, label }: CourseCardProps) {
  return (
    // @ts-ignore
    <Card className="border">
      {/* @ts-ignore */}
      <CardHeader className="h-64">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </CardHeader>
      {/* @ts-ignore */}
      <CardBody>
        <div className="flex items-center gap-2">
          {/* @ts-ignore */}
          <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-gray-500">
            {tag}
          </Typography>
        </div>
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-900">
          {/* @ts-ignore */}
          <Typography variant="h5" className="mb-2 normal-case">
            {title}
          </Typography>
        </a>
        {/* @ts-ignore */}
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        {/* @ts-ignore */}
        <Button variant="outlined">{label}</Button>
      </CardBody>
    </Card>
  );
}

export default CourseCard;
