import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const roles = [
  "Backend Engineer",
  "Frontend Engineer",
  "Software Engineer",
  "Engineering Manager",
  "Artificial Intelligence Engineer (AI)",
  "Machine Learning Engineer",
  "Product Manager",
  "Mobile Engineer",
  "Product Designer"
];

const JobDescription = () => {
  return (
    <div className="bg-muted min-h-screen py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Form Section */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Software Engineer Job Description Generator
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Simplify your hiring process with this AI-powered tool. It helps you create precise, customized job descriptions
            that clearly outline the skills, responsibilities, and qualifications you're looking for.
          </p>

          <Card className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Company Name *" />
              <Input placeholder="Website *" />

              <Input placeholder="Role *" />
              <Input placeholder="Job Location (Optional)" />

              <Input placeholder="Department (Optional)" />
              <Input placeholder="Contact Email (Optional)" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Role Type (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Work Type (Optional)" defaultValue="Hybrid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Application Link (Optional)" className="md:col-span-2" />
            </div>

            <Button className="w-full mt-4 text-base">Generate JD</Button>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">JD Generators</h2>
            <ul className="space-y-2 text-muted-foreground">
              {roles.map((role, i) => (
                <li key={i} className="hover:text-primary cursor-pointer">{role}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
