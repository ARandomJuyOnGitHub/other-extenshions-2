//% groups='["Anchor", "Properties", "Conversion"]'
//% weight=100 color=#0fbc11
namespace anchor{
    let spriteCache: Sprite[] = []
    let anchorCache: Anchor[][] = []

    function getAnchors(sprite: Sprite) {
        let index = spriteCache.indexOf(sprite)
        if (index > -1) {
            return anchorCache.get(index)
        } else {
            return null
        }
    }

    function locateSpriteAnchor(anchorArray: Anchor[], sprite: Sprite) {
        for (let anchor of anchorArray) {
            if (anchor.sprite1 == sprite) {
                return anchor
            }
        }

        return null
    }

    class Anchor {
        sprite0: Sprite;
        sprite1: Sprite;
        offset: Vector2;

        constructor(sprite0: Sprite, sprite1: Sprite, _offset: Vector2) {
            this.sprite0 = sprite0;
            this.sprite1 = sprite1;
            this.offset = _offset;
        }

        destroy() {
            let anchorArray = getAnchors(this.sprite0)
            anchorArray.removeElement(this)

            this.sprite0 = null
            this.sprite1 = null
            this.offset = null
        }
    }

    game.onUpdate(function () {
        if (anchorCache.length > 0) {
            for (let anchorArray of anchorCache) {
                for (let anchor of anchorArray) {
                    anchor.sprite1.setPosition(anchor.sprite0.x + anchor.offset.x, anchor.sprite0.y + anchor.offset.y)
                }
            }
        }
    })

    /**
     * Anchors one sprite to another
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     * @param offset the offset of the anchored sprite
     */
    //% block="Anchor $sprite1 to $sprite0 with an offset of $offset"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% offset.shadow="variables_get" offset.defl="vector2"
    //% group="Anchor"
    //% weight=50
    export function anchorSprite(sprite0: Sprite, sprite1: Sprite, offset: Vector2) {
        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = new Anchor(sprite0, sprite1, offset)
            anchorArray.push(anchor)
        } else {
            let newIndex = spriteCache.length
            spriteCache.push(sprite0)
            anchorCache.insertAt(newIndex, [new Anchor(sprite0, sprite1, offset)])
        }
    }

    /**
     * Anchors one sprite to another with a predefined offset based on the anchored sprite's current position.
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     */
    //% block="Anchor $sprite1 to $sprite0 with sprite's current offset"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% group="Anchor"
    //% weight=49
    export function anchorSpriteCurrOffset(sprite0: Sprite, sprite1: Sprite) {
        let xoffset = sprite1.x - sprite0.x
        let yoffset = sprite1.y - sprite0.y

        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = new Anchor(sprite0, sprite1, vectors.create(xoffset,yoffset))
            anchorArray.push(anchor)
        } else {
            let newIndex = spriteCache.length
            spriteCache.push(sprite0)
            anchorCache.insertAt(newIndex, [new Anchor(sprite0, sprite1, vectors.create(xoffset, yoffset))])
        }
    }

    /**
     * Unanchors one sprite from another.
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     */
    //% block="unanchor $sprite1 from $sprite0"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% group="Anchor"
    //% weight=48
    export function unanchorSprite(sprite0: Sprite, sprite1: Sprite) {
        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = locateSpriteAnchor(anchorArray, sprite1)
            if (anchor) {
                anchor.destroy()
            } else {
                throw ("sprite1 is not anchored to sprite0")
            }
        } else {
            throw ("sprite1 is not anchored to sprite0")
        }
    }

    /**
     * Returns the offset of the anchored sprite.
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     */
    //% block="the offset of $sprite1, anchored to $sprite0"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% group="Properties"
    //% weight=50
    export function getOffset(sprite0: Sprite, sprite1: Sprite): Vector2 {
        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = locateSpriteAnchor(anchorArray, sprite1)
            if (anchor) {
                return anchor.offset
            } else {
                throw ("sprite1 is not anchored to sprite0")
            }
        } else {
            throw ("sprite1 is not anchored to sprite0")
        }
    }

    /**
     * Sets the offset of the anchored sprite
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     * @param newOffset the offset to be set to
     */
    //% block="set the offset of $sprite1, anchored to $sprite0, to $newOffset"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% newOffset.shadow="variables_get" newOffset.defl="vector2"
    //% group="Properties"
    //% weight=49
    export function setOffset(sprite0: Sprite, sprite1: Sprite, newOffset: Vector2) {
        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = locateSpriteAnchor(anchorArray, sprite1)
            if (anchor) {
                anchor.offset = newOffset
            } else {
                throw ("sprite1 is not anchored to sprite0")
            }
        } else {
            throw ("sprite1 is not anchored to sprite0")
        }
    }

    /**
     * Shifts the offset of the anchored sprite
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     * @param changeVector the vector to shift the offset by
     */
    //% block="change the offset of $sprite1, anchored to $sprite0, by $changeVector"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% changeVector.shadow="variables_get" changeVector.defl="vector2"
    //% group="Properties"
    //% weight=48
    export function changeOffset(sprite0: Sprite, sprite1: Sprite, changeVector: Vector2) {
        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = locateSpriteAnchor(anchorArray, sprite1)
            if (anchor) {
                anchor.offset = vectors.add(anchor.offset,changeVector)
            } else {
                throw ("sprite1 is not anchored to sprite0")
            }
        } else {
            throw ("sprite1 is not anchored to sprite0")
        }
    }

    /**
     * Returns true if sprite1 is anchored to sprite0. Returns false otherwise.
     * @param sprite0 the parent sprite
     * @param sprite1 the anchored sprite
     */
    //% block="$sprite1 is anchored to $sprite0"
    //% sprite0.shadow="variables_get" sprite0.defl="sprite0"
    //% sprite1.shadow="variables_get" sprite1.defl="sprite1"
    //% group="Properties"
    //% weight=47
    export function isAnchoredTo(sprite0: Sprite, sprite1: Sprite) {
        let anchorArray = getAnchors(sprite0)
        if (anchorArray) {
            let anchor = locateSpriteAnchor(anchorArray, sprite1)
            if (anchor) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    /**
     * Returns true if the sprite is anchored. Returns false otherwise.
     * @param sprite the potentially anchored sprite
     */
    //% block="$sprite is anchored"
    //% sprite.shadow="variables_get" sprite.defl="sprite"
    //% group="Properties"
    //% weight=47
    export function isAnchored(sprite: Sprite) {
        for (let sprite0 of spriteCache) {
            let anchorArray = getAnchors(sprite0)
            let anchor = locateSpriteAnchor(anchorArray, sprite)
            if (anchor) {return true}
        }
        
        return false
    }

    /**
     * Converts a global vector into a local one.
     * @param sprite the reference for the vector conversion
     * @param globalVector the vector to convert
     */
    //% block="$globalVector as a local vector based on $sprite 's position"
    //% sprite.shadow="variables_get" sprite.defl="sprite"
    //% globalVector.shadow="variables_get" globalVector.defl="globalVector2"
    //% group="Conversion"
    //% weight=50
    export function globalToLocalPosition(sprite: Sprite, globalVector: Vector2) {
        return vectors.subtract(globalVector, vectors.create(sprite.x, sprite.y))
    }

    /**
     * Converts a local vector into a global one.
     * @param sprite the reference for the vector conversion
     * @param localVector the vector to convert
     */
    //% block="$localVector as a global vector based on $sprite 's position"
    //% sprite.shadow="variables_get" sprite.defl="sprite"
    //% localVector.shadow="variables_get" localVector.defl="localVector2"
    //% group="Conversion"
    //% weight=49
    export function localToGlobalPosition(sprite: Sprite, localVector: Vector2) {
        return vectors.add(localVector, vectors.create(sprite.x, sprite.y))
    }
}

