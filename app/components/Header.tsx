import { CompanyInfo } from '../types/bus';

interface HeaderProps {
  companyInfo: CompanyInfo;
}

export default function Header({ companyInfo }: HeaderProps) {
  return (
    <header className="bg-white shadow-md border-b-4 border-green-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {companyInfo.name}
              </h1>
              <p className="text-sm text-gray-600">
                {companyInfo.description}
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Founded:</span> {companyInfo.founded}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Headquarters:</span> {companyInfo.headquarters}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Industry:</span> {companyInfo.industry}
            </p>
          </div>
        </div>

        {/* Mobile Company Info */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <p><span className="font-semibold">Founded:</span> {companyInfo.founded}</p>
            <p><span className="font-semibold">Headquarters:</span> {companyInfo.headquarters}</p>
            <p><span className="font-semibold">Industry:</span> {companyInfo.industry}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
