import * as React from 'react';
import { Card, CardBody } from "../ui/card";
import { cn } from "../ui/utils";

export default function ServiceCard({ icon:Icon, title, desc }: { icon: any; title: string; desc: string; }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-gray-100 border border-gray-200">
            <Icon size={20}/>
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{desc}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
