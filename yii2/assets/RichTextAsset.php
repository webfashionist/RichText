<?php

namespace Webfashionist\RichText\assets;

use yii\web\AssetBundle;
use yii\web\YiiAsset;

class RichTextAsset extends AssetBundle
{
    public $sourcePath = '@vendor/webfashionist/rich-text/src';
    public $js = ['jquery.richtext.js'];
    public $css = ['richtext.min.css'];

    public $depends = [
        YiiAsset::class,
        FontAweSomeAsset::class,
    ];
}