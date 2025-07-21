// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// // Define a type for our feature object for type safety
// interface Feature {
//   title: string;
//   description: string;
//   icon: string;
//   bgColor: string;
// }

// // ✅ Corrected: Now it's an array of Feature objects
// const features: Feature[] = [
//   {
//     title: "Students",
//     description: "Manage student enrollment and profiles.",
//     icon: "/icons/icon-students.svg",
//     bgColor: "bg-blue-100",
//   },
//   {
//     title: "Courses",
//     description: "Create and assign courses to faculty.",
//     icon: "/icons/icon-courses.svg",
//     bgColor: "bg-green-100",
//   },
//   // add more features here if needed
// ];

// const FeatureGrid = () => {
//   return (
//     <div className="text-center">
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">
//         Everything You Need in One Place
//       </h2>
//       <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
//         Our system is designed to cover all aspects of academic management,
//         providing a centralized hub for administrators, faculty, and students.
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {features.map((feature) => (
//           <Card
//             key={feature.title}
//             className="text-left hover:shadow-lg transition-shadow"
//           >
//             <CardHeader>
//               <div
//                 className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.bgColor} mb-4`}
//               >
//                 <Image
//                   src={feature.icon}
//                   alt={feature.title}
//                   width={28}
//                   height={28}
//                 />
//               </div>
//               <CardTitle>{feature.title}</CardTitle>
//               <CardDescription>{feature.description}</CardDescription>
//             </CardHeader>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeatureGrid;
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Define a type for our feature object for type safety
interface Feature {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

// ✅ Corrected: Now it's an array of Feature objects
const features: Feature[] = [
  {
    title: "Students",
    description: "Manage student enrollment and profiles.",
    icon: "/icons/icon-students.svg",
    bgColor: "bg-blue-100",
  },
  {
    title: "Courses",
    description: "Create and assign courses to faculty.",
    icon: "/icons/icon-courses.svg",
    bgColor: "bg-green-100",
  },
  // add more features here if needed
];

const FeatureGrid = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Everything You Need in One Place
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        Our system is designed to cover all aspects of academic management,
        providing a centralized hub for administrators, faculty, and students.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="text-left hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.bgColor} mb-4`}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={28}
                  height={28}
                />
              </div>
              {/* FIX: Added high-contrast text colors */}
              <CardTitle className="text-blue-600">{feature.title}</CardTitle>
              <CardDescription className="text-gray-600">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
