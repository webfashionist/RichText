<?php

namespace Webfashionist\RichText\widgets;

use yii\base\Widget;
use yii\helpers\Html;
use Yii;

use Webfashionist\RichText\assets\RichTextAsset;

class RichTextWidget extends Widget
{
    public $model, $attribute;
    public $autoInit = true;
    public $inputParams = [];
    public $clientParams = [];

    public function run()
    {
        RichTextAsset::register($this->view);
        if ($this->autoInit) {
            $id = Html::getInputId($this->model, $this->attribute);
            $this->view->registerJs('$("#' . $id . '").richText('. json_encode($this->clientParams) .');');
        }
        return Html::activeTextarea($this->model, $this->attribute, $this->inputParams);
    }
}