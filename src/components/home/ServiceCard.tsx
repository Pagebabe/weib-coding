import * as React from 'react';
import { Card, CardBody } from "../ui/card";
import { cn } from "../ui/utils";

export default function ServiceCard({ icon:Icon, title, desc }: { icon: any; title: string; desc: string; }) {
  return (
    <Card className="hover:shadow-lg transition-shadow" style={{borderColor: 'var(--card-border)'}}>
      <CardBody>
        <div className="flex items-start gap-3">
          <div 
            className="p-2 rounded-xl border transition-colors hover:opacity-80" 
            style={{
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            <Icon size={20}/>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2" style={{color: 'var(--color-text)'}}>{title}</h3>
            <p className="text-sm" style={{color: 'var(--color-muted)'}}>{desc}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
