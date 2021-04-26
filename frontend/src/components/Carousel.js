import React from 'react'
import { Carousel} from 'react-bootstrap'


function CarouselDisplay({image}) {
    return (
        
        <Carousel fade indicators='false' Control='false'>
        <Carousel.Item>
          <img
            className="w-100"
            resizeMode='contain'
            src="https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/147722387_481530296569210_5181826031690954173_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=w2dX-PpcrZYAX8gVGE9&_nc_ht=scontent.fktm7-1.fna&oh=2a64058fbbd539503d9bf9733d85d636&oe=60A3F9A4"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            resizeMode='contain'
            src="https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/148158532_482155763173330_8654434127043998249_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=xdZbfzM3WCUAX8sAiDv&_nc_ht=scontent.fktm7-1.fna&oh=2317245b9ae7ecc42a6f58974dd53f57&oe=60A4040E"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            resizeMode='contain'
            src="https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/169075999_522596032462636_3614833903259458884_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=N9CIE1DMroQAX8z3Hqx&_nc_ht=scontent.fktm7-1.fna&oh=c8afbc2c91636d3aba63370497be8a7f&oe=60A2CB15"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            resizeMode='contain'
            src="https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/133158723_453058269416413_571825166875733163_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=CEm677uBpg8AX_1ewBS&_nc_ht=scontent.fktm7-1.fna&oh=70bfc484fec976565c55be0f1e108d43&oe=60A284C8"
            alt="Fourth slide"
          />
        </Carousel.Item>

      </Carousel>
      
    )
}

export default CarouselDisplay



//https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/147722387_481530296569210_5181826031690954173_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=w2dX-PpcrZYAX8gVGE9&_nc_ht=scontent.fktm7-1.fna&oh=2a64058fbbd539503d9bf9733d85d636&oe=60A3F9A4
//https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/148158532_482155763173330_8654434127043998249_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=xdZbfzM3WCUAX8sAiDv&_nc_ht=scontent.fktm7-1.fna&oh=2317245b9ae7ecc42a6f58974dd53f57&oe=60A4040E
//https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/169075999_522596032462636_3614833903259458884_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=N9CIE1DMroQAX8z3Hqx&_nc_ht=scontent.fktm7-1.fna&oh=c8afbc2c91636d3aba63370497be8a7f&oe=60A2CB15
//https://scontent.fktm7-1.fna.fbcdn.net/v/t1.6435-9/133158723_453058269416413_571825166875733163_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=CEm677uBpg8AX_1ewBS&_nc_ht=scontent.fktm7-1.fna&oh=70bfc484fec976565c55be0f1e108d43&oe=60A284C8