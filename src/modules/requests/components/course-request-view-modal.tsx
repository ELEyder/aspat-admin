import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  User,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import type { CourseRequest } from "../types/CourseRequest";

interface Props {
  request: CourseRequest;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CourseRequestViewModal({
  request,
  open,
  setOpen,
}: Props) {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Detalles de la Solicitud
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Revisa la información completa del usuario y su solicitud de curso.
          </DialogDescription>
        </DialogHeader>

        <Card className="shadow-none border border-gray-200 mt-3">
          <CardContent className="space-y-5 py-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <User size={18} />
                <span>Usuario</span>
              </div>
              <p className="text-gray-900">
                {`${request.user.first_name ?? ""} ${
                  request.user.last_name ?? ""
                }`.trim() || "No especificado"}
              </p>

              {request.user?.email && (
                <p className="text-gray-500 flex items-center gap-1">
                  <Mail size={16} className="text-gray-400" />{" "}
                  {request.user.email}
                </p>
              )}
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <BookOpen size={18} />
                <span>Curso</span>
              </div>
              <p className="text-gray-900">
                {request.course?.translations?.[0]?.title ?? "No especificado"}
              </p>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Estado</p>
              <Badge
                className="px-3 py-1 text-sm font-medium rounded-full border-0"
                style={{
                  backgroundColor: request.status.bg_color.startsWith("#")
                    ? request.status.bg_color
                    : "#f3f4f6",
                  color: request.status.text_color.startsWith("#")
                    ? request.status.text_color
                    : "#111827",
                }}
              >
                {request.status?.translations?.[0]?.name ?? "Sin estado"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <MessageSquare size={18} />
                <span>Mensaje</span>
              </div>
              <p className="whitespace-pre-line text-gray-700 bg-gray-50 border rounded-md p-3 text-sm">
                {request.message || "Sin mensaje"}
              </p>
            </div>

            <Separator />
          </CardContent>
        </Card>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
