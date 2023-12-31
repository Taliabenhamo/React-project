import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

function FormLayout({ children }: Props) {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center h-100">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          {children}
        </div>
      </div>
    </div>

  );
}

export default FormLayout;