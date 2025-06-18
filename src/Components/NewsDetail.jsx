import React, { useEffect, useState } from 'react';
import img1 from '../assets/1.jpg';


const NewsDetail = ({}) => {

    const newsData ={
            id: 1,
            image: img1,
            title: 'RF PROJECT',
            subtitle: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis  nulla sed orci faucibus elementum. Nullam tellus metus, placerat sed  erat nec, semper consequat erat. Donec pretium lectus arcu, id interdum  ex varius in. Phasellus cursus hendrerit turpis in faucibus. Nunc  egestas diam ut libero vehicula porttitor. Proin magna massa, accumsan  ac facilisis in, consectetur eu enim. Cras ac lectus lacus. Nulla  lobortis erat non mi venenatis, suscipit convallis sem dignissim. Nam eu porta velit. Duis ornare, turpis at ultricies iaculis, lacus dui  gravida nisl, porta consectetur magna metus a libero. Sed bibendum  mauris efficitur leo egestas, eget mollis felis venenatis. Sed eleifend  fermentum odio. Cras quis metus aliquet, convallis est vitae, vehicula  augue. Donec rhoncus lacinia est, vitae volutpat ex viverra eget.  Pellentesque ac lorem lobortis, vulputate quam et, eleifend velit. Proin venenatis velit sit amet volutpat rhoncus. Nam nec ornare ipsum.  Aenean aliquam eleifend sodales. Nulla odio lorem, lacinia eget sapien  ac, iaculis luctus libero. Maecenas sed bibendum orci. Cras sagittis,  nibh at cursus iaculis, diam risus blandit turpis, ut volutpat purus  felis eget odio. Donec blandit laoreet tortor.'
            }

  return (
    <div className="bg-[#AC9364] justify-center py-8 min-h-screen"> {/* Added margin for visual spacing */} 
        <div className="relative w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border">
        <div className="w-full h-full overflow-hidden relative rounded-lg">
            <img
                src={newsData.image}
                alt={newsData.title}
                className="w-full h-[400px] object-cover rounded-t-[15px]"
            />
            <div className="p-6 rounded-b-lg">
                <h2 className="text-3xl font-bold mb-2 text-white">{newsData.title}</h2>
                <p className="text-lg text-white">{newsData.subtitle}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;